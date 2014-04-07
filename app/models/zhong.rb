# encoding: utf-8
class Zhong
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic
  include Mongoid::Timestamps

  field :cname, type: String
  field :ldname, type: String
  field :aliases, type: Array, default: []        #['别名1','别名2',...]
  field :xingtai, type: String
  field :huaqi, type: String
  field :xingzhuang,  type: String
  field :guanshang,   type: Array, default: []   #hash数组[{"hua":"yes"},...]
  field :gongneng,  type: Array, default: []     #['抗污染',"抗病",...]
  field :pics,  type: String                       #只存储目录名

  embeds_one :shengtai, class_name: "Shengtai", validate: false
  embeds_one :engineering, class_name: "Engineering", validate: false

  belongs_to :shu

end

