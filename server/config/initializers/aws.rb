# Aws.config.update({
#   region: 'us-west-2',
#   credentials: Aws::Credentials.new(ENV['AWS_ACCESS_KEY_ID'], ENV['AWS_SECRET_ACCESS_KEY']),
# })

AWS.config(
  :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
  :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
)

S3_BUCKET =  AWS::S3.new.buckets[ENV['S3_BUCKET']]
