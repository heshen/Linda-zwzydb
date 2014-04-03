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
		recvd_json = params[:q_data]
		crit_where_json = {}
		crit_in_json = {}

		#对于String类hash value(形如/乔木/)，hash数据规范化处理：1) 去掉value两端的/号；2) 将value字符串对象转换成Regexp对象；
		recvd_json.each{ |key, value|
			unless (/\/.*\// =~ recvd_json[key]).nil?         #处理String型Criteria
				crit_where_json[key] = recvd_json[key].gsub(/\//,'')
				crit_where_json[key]=Regexp.new(crit_where_json[key])
			end

			unless (/\[.*\]/ =~ recvd_json[key]).nil?        #处理Array型Criteria
				crit_in_json[key] = recvd_json[key].gsub(/\[/,'').gsub(/\]/,'')
				crit_in_json[key] = crit_in_json[key].split(",")                    #返回的就是数组
			end
		}

		#实施查询，返回文档集
		records_found = Zhong.where(crit_where_json).in(crit_in_json)           #数组用in为or关系；all为and关系；
		n_records = records_found.count


		#循环构造返回hash
		content_array=[]
		response_json = {}

		n_records.times do |i|
			tmp_j = {}
			tmp_j["cname"] = records_found[i].cname
			tmp_j["pics"] = records_found[i].pics
			content_array << tmp_j
		end


		response_json = {"data_s" => content_array }

		puts "--------rec_json--------------"
		puts recvd_json
		puts "--------n_records-------------"
		puts n_records
		puts "--------crit_where_json-------------"
		puts crit_where_json
		puts "--------crit_in_json-------------"
		puts crit_in_json
		puts "--------response_json-------------"
		puts response_json

		render :json => {"data_s" => content_array }.to_json

	end

end
