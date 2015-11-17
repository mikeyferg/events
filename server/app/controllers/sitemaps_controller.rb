class SitemapsController < ApplicationController

  def show
  # Redirect to CloudFront and S3
  redirect_to "http://d1djo4dt3eruu4.cloudfront.net/sitemap.xml.gz"
  end
end
