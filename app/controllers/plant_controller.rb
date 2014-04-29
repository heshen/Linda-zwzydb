# encoding: utf-8
class PlantController < ApplicationController
	require 'aliyun/oss'
	include Aliyun::OSS

	config = YAML.load_file('config/secrets.yml')
	#Connect to Aliyun::OSS
	Aliyun::OSS::Base.establish_connection!(
		  :server => 'oss-cn-qingdao.aliyuncs.com',  #Default value is : oss.aliyuncs.com
		  :access_key_id     => config["aliyun_oss_access_key_id"],
		  :secret_access_key => config["aliyun_oss_secret_access_key"]
	)

	def index
		@myke = Ke.all
		@myke_name = Ke.all.entries
  end

  # 查询页面
  def plant_querying
		@mynewtest = "dongzheng is now testing..."
	end

	# Called by ajax, no standalone view.
  def list_plant_querying
		recvd_json = params[:q_data]
		crit_where_json = {}
		crit_in_json = {}

		#对于String类hash value(形如/乔木/)，hash数据规范化处理：1) 去掉value两端的/号；2) 将value字符串对象转换成Regexp对象；
		recvd_json.each{ |key, value|
			crit_where_json[key] = recvd_json[key]              #默认直接在where条件中使用(支持形如{"guanshang.pi":"yes"})的Criteria

			unless (/~.*~/ =~ recvd_json[key]).nil?           #处理String型Criteria(windows下编码有问题，暂时用~作为区隔符)
				crit_where_json[key] = recvd_json[key].gsub(/~/,'')
				crit_where_json[key]=Regexp.new(crit_where_json[key])
			end

			unless (/\[.*\]/ =~ recvd_json[key]).nil?        #处理Array型Criteria
				crit_in_json[key] = recvd_json[key].gsub(/\[/,'').gsub(/\]/,'')
				crit_in_json[key] = crit_in_json[key].split(",")                    #返回的就是数组
				crit_where_json.delete(key)
			end
		}

		#实施查询，返回文档集
		records_found = Zhong.where(crit_where_json).in(crit_in_json)           #数组用in为or关系；all为and关系；
		n_records = records_found.count

		#循环构造返回hash
		content_array=[]
		n_records.times do |i|
			tmp_j = {}
			tmp_j["cname"] = records_found[i].cname
			tmp_j["pics"] = records_found[i].pics
			content_array << tmp_j
		end

		render :json => {"data_s" => content_array }.to_json

  end

  # 植物详情页 (新版，从Aliyun::OSS的 /pic-store中读取)
  def plant_show
		 @pic_dir1 = params[:picdir1]
		 @q_cname = params[:plant_name]

		 @zhong = Zhong.where("cname" => @q_cname)
		 return 0 if (@zhong.count == 0)
		 @ke = Ke.all

		 @yingyong_quyu = @zhong[0].engineering.yingyong_quyu.join(",")
		 @gongneng = @zhong[0].gongneng.join(",")
		 @guanshang = @zhong[0].guanshang.join(",")

		 oss_store = Bucket.find('pic-store')
		 @zhong_img_count = oss_store.objects(:max_keys => 300, :prefix => @pic_dir1+'/'+ @q_cname).size - 1

		 #建立全体图片列表，以供右侧随机显示
		 oss_store = Bucket.find('pic-store')     #前一步oss_store.objects(...)改变了oss_store的内容！只能重新获取。
		 all_files_list = oss_store.objects(:max_keys => 300)    #取得最多前300个文件object数组
		 # TODO: 将来考虑用其他更高效的方式实现随机图片显示功能
		 @all_pic_path_arr = []
		 all_files_list.each_index{|x|
			 if all_files_list[x].key.end_with?(".jpg")
				 @all_pic_path_arr << all_files_list[x].key
			 end
		 }
		 @all_img_count = @all_pic_path_arr.count

		 @all_img_arr = []    #[[src_path, cn_name],[],...]  Generate in random.
		 for i in 1..6 do
			 src_path = @all_pic_path_arr[rand(@all_img_count)]
			 tmp_arr = [] << src_path
			 cn_name =  /.*\/(?<name>.*)\/.*$/.match(src_path)[:name]   #src_path includes Zhong name
			 tmp_arr << cn_name
			 @all_img_arr << tmp_arr
		 end

	 end
end



