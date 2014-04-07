# encoding: utf-8
class NameMap
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  field :names, type: Hash

end

