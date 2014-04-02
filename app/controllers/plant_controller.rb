# encoding: utf-8
class PlantController < ApplicationController
  def index
		@myke = Ke.all
		@myke_name = Ke.all.entries
  end

	def plant_querying
		@mynewtest = "dongzheng is now testing..."
	end

	def list_plant_querying
		recd_json = params[:q_data]

		#hash数据规范化处理：1) 去掉value两端的/号；2) 将value字符串对象转换成Regexp对象；
		recd_json.each{|key, value| recd_json[key].gsub!(/\//,'')}
		recd_json.each{|key, value| recd_json[key]=Regexp.new(recd_json[key])}

		#实施查询，返回文档集
		records_found = Zhong.where(recd_json)
		n_records = records_found.count


		#循环构造返回hash
		response_json = {}
		content_array=[]

		n_records.times do |i|
			tmp_j = {}
			tmp_j["cname"] = records_found[i].cname
			tmp_j["pics"] = records_found[i].pics
			content_array << tmp_j
		end


		response_json = {"data_s" => content_array }

		puts "--------rec_json--------------"
		puts recd_json
		puts "--------n_records-------------"
		puts n_records
		puts "--------response_json-------------"
		puts response_json

		render :json => response_json.to_json

	end

end
