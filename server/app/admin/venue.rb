
ActiveAdmin.register Venue do
 actions :index, :show, :new, :export
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

# def self.build_csv
#   @csv = CSV.generate do |csv|
#     csv << csv_builder_columns.map(&:name)
#
#     scope.each do |resource|
#       row = []
#       csv_builder_columns.each do |column|
#         row << call_method_or_proc_on(resource, column.data)
#       end
#
#       csv << row
#     end
#   end
# end


controller do
  def find_resource
    scoped_collection.where(slug: params[:id]).first!
  end
end

csv do
  column :id
  column :name
  column :address
end

# action_item only: :index do
#   link_to 'Export to CSV', Venue.build_csv
# end
#
# csv do
#   ModelName::ATTR_ADMIN_EXPORT.each do |sym|
#     column sym
#   end
# end




end
