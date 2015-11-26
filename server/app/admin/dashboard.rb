ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    div class: "blank_slate_container", id: "dashboard_default_message" do
      span class: "blank_slate" do
        span I18n.t("active_admin.dashboard_welcome.welcome")
        small I18n.t("active_admin.dashboard_welcome.call_to_action")
      end
    end
    ActiveAdmin.setup do |config|
      config.comments = false
    end

  end # content

  ActiveAdmin.register Event do
    permit_params :name, :address, :city_id, :end_time, :start_date_time_array, :summary, :image_url, :page_url, :address, :cost, :cost_integer, :sources_url, :end_date, :date_only, :time_only, :featured, :schedule
    form do |f|
      f.input :name
      f.input :address
      # f.input :date_only, as: :datepicker
      # f.input :time_only, as: :time_picker
      f.input :summary
      f.input :image_url
      f.input :page_url
      f.input :address
      f.input :cost
      f.input :source_url
      f.input :featured
      f.input :city_id
      f.input :venue_id
      f.submit :submit
    end
  end

  ActiveAdmin.register Venue do

    permit_params :name, :address, :city_id, :image_url

    form do |f|
      f.input :name
      f.input :address
      f.input :image_url

      f.submit :submit
    end
  end


end
