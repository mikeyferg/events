
City.create!([
  {name: "San Francisco",
  nickname: "sf"},
  {name: "Los Angeles",
  nickname: "la"},
  {name: "New York",
  nickname: "nyc"}
  ])

Event.create!([
    {
      name: "Segway Time Travel Halloween Night Tour - Explore San Francisco's Dark Past",
      start_time: "2015-10-12T19:30:00+00:00",
      end_time: "",
      venue: "Electric Tour Company - Fisherman's Wharf Office",
      summary: "",
      image_url: "http://www.sfstation.com/images/ev/50/2287050a_tn220x220.jpg",
      created_at: "2015-10-12T22:13:14.892Z",
      updated_at: "2015-10-12T22:13:15.657Z",
      address: "757 Beach Street, San Francisco, CA",
      cost: "$70",
      source_url: "http://www.sfstation.com/app/redir.php?eventId=2287050&res=ed67e185ce55cd6a07d4273dde3aed63",
      end_date: "",
      date_only: "2015-10-12",
      time_only: "2015-10-12 19:30:00 -0700",
      image_file_name: "2287050a_tn220x220.jpg",
      image_content_type: "image/jpeg",
      image_file_size: 50051,
      image_updated_at: "2015-10-12T22:13:15.459Z",
      city_id: 1,
    },
    {
      name: "Mixtape Monday Feat Jabbajaw",
      start_time: "2015-10-12T22:00:00+00:00",
      end_time: "",
      venue: "MATRIXFILLMORE",
      summary: '',
      image_url: "http://www.sfstation.com/images/ev/99/2287799a_tn220x220.jpg",
      created_at: "2015-10-12T22:13:18.310Z",
      updated_at: "2015-10-12T22:13:18.749Z",
      address: "3138 Fillmore Street, San Francisco, CA",
      cost: "Free",
      source_url: "http://www.sfstation.com/app/redir.php?eventId=2287799&res=e9189b7a00b90ee84f803b721bcf85a1",
      end_date: '',
      date_only: "2015-10-12",
      time_only: "2015-10-12 22:00:00 -0700",
      image_file_name: "2287799a_tn220x220.jpg",
      image_content_type: "image/jpeg",
      image_file_size: 21950,
      image_updated_at: "2015-10-12T22:13:18.589Z",
      city_id: 1,
    }
  ])

  city = City.first
  city.city_events_will_change!
  city.city_events << Event.first['id']
  city.city_events << Event.find(2)['id']
  city.save
  #City.delete_all


  #User.delete_all

  # User.create!([
  #   {name: "mike",
  #     pic_url: "https://pbs.twimg.com/profile_images/1575699133/me__4__400x400.jpg"
  #   },
  #   {
  #     name: "sasha",
  #     pic_url: "https://pbs.twimg.com/profile_images/378800000367201581/5fdde49e2b1d0793499a92ac8a2401f8.jpeg"
  #   }
  # ])
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')