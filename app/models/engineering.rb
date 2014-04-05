# encoding: utf-8
class Engineering
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  field :shibie_tezheng, type: String
  field :zhongzhi_midu, type: String
  field :miaomu_guige, type: String
  field :sheji_jianyi, type: String
  field :shigong_yaodian, type: String
  field :yanghu_yaodian, type: String
  field :cankao_jiage, type: String

  embedded_in :zhong

end

