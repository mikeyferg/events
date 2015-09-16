# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Event.delete_all

Event.create!([
  {name: "Skrillex Party",
    start_time: DateTime.strptime("09/01/2018 17:00", "%m/%d/%Y %H:%M"),
    end_time: DateTime.strptime("09/01/2018 19:00", "%m/%d/%Y %H:%M"),
    venue: "Bill Graham",
    summary: 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of  (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32.',
    image_url: "http://static.spin.com/files/140210-skrillex03.jpg"
    },
    {name: "Square Dancing",
      start_time: DateTime.strptime("09/05/2018 17:00", "%m/%d/%Y %H:%M"),
      end_time: DateTime.strptime("09/05/2018 19:00", "%m/%d/%Y %H:%M"),
      venue: "El Rio",
      summary: 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of  (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,  comes from a line in section 1.10.32.',
      image_url: "http://squaredancemagazine.com/wp-content/uploads/2009/02/travelinghoedownersparty2008.jpg"
    }
  ])
