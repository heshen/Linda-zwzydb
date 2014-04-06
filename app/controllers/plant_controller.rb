# encoding: utf-8
class PlantController < ApplicationController
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

  # 植物详情页
  def plant_show
		@q_cname = params[:plant_name]
		@pic_dir1 = params[:picdir1]
		@pic_dir2 = params[:picdir2]

	  @zhong = Zhong.where("cname" => @q_cname)
		@ke = Ke.all

		@b_found = true
		@b_found = false if @zhong.count == 0

		if @b_found
			@chandi = @zhong[0].chandi.join(",")
			@gongneng = @zhong[0].gongneng.join(",")

			@guanshang = []
			@zhong[0].guanshang.each{|x|
				case x.keys[0]
					when "hua"
						 @guanshang << "观花"
					when "ye"
						 @guanshang << "观叶"
					when "guo"
						 @guanshang << "观果"
					when "zhi"
						 @guanshang << "观枝"
					when "pi"
						 @guanshang << "观皮"
					end
			}
			@guanshang = @guanshang.join(",")

			pic_path = File.join("public","plant","img",@pic_dir1,@pic_dir2)
			@img_count = Dir.entries(pic_path).count - 3

			Dir.chdir("public")    #临时从/Linda-zwzydb根目录，进入到public子目录；用于生成相对于/plant为根目录的图片asset路径；
			all_pic_dir_pattern = File.join("plant","img","**","*.jpg")
			@all_pic_path_arr = Dir.glob(all_pic_dir_pattern)
			Dir.chdir("../")       #返回/Linda-zwzydb根目录

			@all_img_count = @all_pic_path_arr.count

			@all_img_arr = []
			@name_map = NameMap.all[0]  #种名中英文对照表
			for i in 1..6 do
				tmp_arr = []
				rand_num = rand(@all_img_count)
				src_path = "/"+@all_pic_path_arr[rand_num]
				tmp_arr << src_path
				en_name = /\/.*\/.*\/(?<name>.*)\/.*/.match(src_path)[:name]
				puts "------en_name-----"
				puts en_name
				cn_name = @name_map.names[en_name]
				puts "------cn_name-----"
				puts cn_name

				tmp_arr << cn_name

				@all_img_arr << tmp_arr
			end

			puts "------@all_img_arr---------"
			for i in 0..5 do
			   puts @all_img_arr[i][0]
			   puts "--and ---"
				 puts @all_img_arr[i][1]
			end
			puts "---------------------------"
		end


	end

end



