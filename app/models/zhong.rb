# encoding: utf-8
class Zhong
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic
  include Mongoid::Timestamps

  field :cname, type: String
  field :ldname, type: String
  field :aliases, type: Array, default: []

  field :chandi,  type: Array, default: []
  field :xingtai, type: String
  field :xingzhuang,  type: String
  field :guanshang,   type: Array, default: [{"花"=> ""},{"叶"=>""},{"果"=>""}]
  field :gongneng,  type: Array, default: []
  field :pics,  type: String

  embeds_one :shengtai, class_name: "Shengtai", validate: false

  belongs_to :shu

end

