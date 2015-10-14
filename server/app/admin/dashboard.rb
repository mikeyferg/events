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


    # Here is an example of a simple dashboard with columns and panels.
    #
    # columns do
    #   column do
    #     panel "Recent Posts" do
    #       ul do
    #         Post.recent(5).map do |post|
    #           li link_to(post.title, admin_post_path(post))
    #         end
    #       end
    #     end
    #   end

    #   column do
    #     panel "Info" do
    #       para "Welcome to ActiveAdmin."
    #     end
    #   end
    # end
  end # content

  ActiveAdmin.register Event do
    permit_params :name, :city_id, :end_time, :venue, :summary, :image_url, :address, :cost, :sources_url, :end_date, :date_only, :time_only
    form do |f|
    f.input :date_only, as: :datepicker#, datepicker_options: { min_date: "2013-10-8",        max_date: "+3D" }
    #f.input :date_onlu,   as: :datepicker, datepicker_options: { min_date: 3.days.ago.to_date, max_date: "+1W +5D" }
    f.input :name
    f.submit :submit
  end
  end

end
