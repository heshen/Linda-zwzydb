# encoding: utf-8
class Shengtai
	include Mongoid::Document
	include Mongoid::Attributes::Dynamic
	include Mongoid::Timestamps

	field :temperature, type: String
	field :light, type: String
	field :huminity, type: String
	field :moisture, type: String
	field :salt, type: String
	field :soil, type: String
	field :genxi, type: String
	field :nanyi, type: String
	field :sudu, type String
	field :shouming, type String

	embedded_in :zhong

end

