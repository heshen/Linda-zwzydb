# encoding: utf-8
class Ontology
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  def test_fun
		myke = Ke.where({:name =>'杨柳科'},{:name =>'松科'})
		p "myke.count="
		p myke.count
  end

  def onto_var2
	  @morphology_ontology2 = {
			  :_id => "morphology2",
			  :arbor => {
					  :big_arbor => {
							  :evergreen_arbor => "常绿大乔木",
							  :deciduous_arbor => "落叶大乔木" },
					  :sub_arbor => "亚乔木",
					  :small_arbor => "小乔木" },
			  :shrub => {
					  :big_shrub => "大灌木",
					  :small_shrub => "小灌木" },
			  :vine => "藤本",
			  :herbal => "草本",
			  :lawn => "草坪地被"
	  }
	  @onto2 = Ontology.create(@morphology_ontology2)
		@onto2.save
		#p @onto2.arbor
		@onto2
	  @morphology_ontology2
  end

  def onto_var1
	  @morphology_ontology1 = {
	    :_id => "morphology1",
	      "QiaoMu" => {
	       "大乔木" => {
	  		      "常绿大乔木" => "常绿大乔木",
	            "落叶大乔木" => "落叶大乔木"
	       },
	         "亚乔木" => {    },
	         "小乔木" => {    }
	      },
	      "灌木" => {
	        "大灌木" => "大灌木",
	        "小灌木" => "小灌木"
	      },
	      "藤本" => "藤本",
	      "草本" => "草本",
	      "草坪地被" => "草坪/地被"
	  }
	  @onto1 = Ontology.create(@morphology_ontology1)
	  @onto1.save
	  #p @onto2.arbor
	  @onto1
	  @morphology_ontology1["QiaoMu"]
  end

end

