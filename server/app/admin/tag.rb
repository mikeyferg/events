ActiveAdmin.register Tag do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if resource.something?
#   permitted
# end
controller do
  def find_resource
    scoped_collection.where(slug: params[:id]).first!
  end
end

  # 
  # csv do
  #   column :id
  #   column :name
  #   column :Tag.find(:id).count
  # end


end
