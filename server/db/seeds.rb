
City.create!([
  {name: "San Francisco",
  nickname: "sf"},
  {name: "Los Angeles",
  nickname: "la"},
  {name: "New York",
  nickname: "nyc"}
  ])

Tag.create!([
  {name: "Live Music"},
  {name: "Bars & Clubs"},
  {name: "Nightlife"},
  {name: "Art & Museums"},
  {name: "Comedy"},
  {name: "Theatre & Dance"},
  {name: "Food & Wine"},
  {name: "Holiday"},
  {name: "Sport & Fitness"},
  {name: "Educational"}
  ])

Venue.create!([
  {
    name: "Bill Graham",
    address: "99 Grove St., San Francisco, CA, 94102",
    image_url: "http://i2.wp.com/www.dailycal.org/assets/uploads/2013/09/Bill-Graham-Civic-Auditorium.jpg",
    city_id: 1
  },
  {
    name: "Harlot",
    address: "46 Minna St, San Francisco, CA 94105",
    image_url: "http://cdn.vfolder.net/original/Cr3rAqnr6CP/HARLOT.jpg",
    city_id: 1
  }
  ])

  User.create!([
    {
      name: "User1",
      email: "test@ttest.com"
    },
    {
      name: "User2",
      email: "testemail@test2.com"
    }
  ])


Event.create!([
    {
      name: "Segway Time Travel Halloween Night Tour - Explore San Francisco's Dark Past",
      image_url: "http://www.sfstation.com/images/ev/50/2287050a_tn220x220.jpg",
      address: "757 Beach Street, San Francisco, CA",
      cost: "$70",
      start_date_time_array: ["2015-12-02T03:30:00.000Z"],
      city_id: 1,
      venue_id: 1,
      schedule: "other dates"
    },
    {
      name: "Mixtape Monday Feat Jabbajaw",
      image_url: "http://www.sfstation.com/images/ev/99/2287799a_tn220x220.jpg",
      address: "3138 Fillmore Street, San Francisco, CA",
      cost: "Free",
      start_date_time_array: ["2015-11-25T03:30:00.000Z"],
      city_id: 1,
      venue_id: 1,
      schedule: "other dates"
    }
  ])

  tag = Tag.first
  tag.events << Event.first
  tag.events << Event.find(2)

  user = User.first
  user.events << Event.first
  user.events << Event.find(2)

  # Partner.create!([
  #     {
  #       name: "Partner1",
  #       email: "test@partner.com",
  #       image_url: "https://pbs.twimg.com/profile_images/526200678780137472/l7zBEZPP_400x400.jpeg",
  #       organization: "NBA",
  #       type: "venue_owner"
  #     }
  #   ])
  #   partner = Partner.first
  #   partner.venues << Venue.first
  #   partner.events << Event.first

 AdminUser.create!(email: ENV['ACTIVEADMIN_NAME'], password: ENV['ACTIVEADMIN_PASSWORD'], password_confirmation: ENV['ACTIVEADMIN_PASSWORD'])
