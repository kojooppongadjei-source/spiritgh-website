/*
  SPIRIT 88.3 FM — PREACHERS AND THE SHOWS THEY HOST
  One entry per preacher. The directory page (/preachers/) is built from this list
  and is ordered by airtime, read from the start of "time".

  slug      folder name of their profile page, e.g. "rev-fred-tetteh" -> /preachers/rev-fred-tetteh/
  honorific Bishop, Apostle, Rev., Pastor, Prophet, Evangelist ... ("" if none)
  name      full name without the honorific
  title     one line about their ministry, e.g. "Founder, Calvary Life Chapel International"
  photo     file in /preachers/images/ (portrait). Leave "" to show initials.
  show      name of the programme they host on Spirit 88.3 FM ("" if not named yet)
  time      airtime, e.g. "3:00 – 3:30 PM" or "11:40 AM – 12:00 noon"
  days      days on air, for the day filter: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
*/
window.PREACHERS = [
  {
    slug: "rev-fred-tetteh",
    honorific: "Rev.", name: "Fred Tetteh",
    title: "",
    photo: "rev-fred-tetteh.jpg",
    show: "Voice of Creation", time: "10:00 – 10:30 AM", days: []
  },
  {
    slug: "rev-simon-ampofo",
    honorific: "Rev.", name: "Simon Ampofo",
    title: "Preacher, Spirit 88.3 FM",
    photo: "rev-simon-ampofo.jpg",
    show: "", time: "11:40 AM – 12:00 noon", days: []
  },
  {
    slug: "douglas-okonah-frimpong",
    honorific: "", name: "Douglas Okonah Frimpong",
    title: "General Overseer, Centre for Christian Outreach Ministries",
    photo: "douglas-okonah-frimpong.jpg",
    show: "Revival Time", time: "3:00 – 3:30 PM", days: []
  },
  {
    slug: "bishop-afotey-odai",
    honorific: "Bishop", name: "Noble Francis Afotey Odai",
    title: "Founder and General Overseer, Maranatha Power Ministries International",
    photo: "bishop-noble-afotey-odai.jpg",
    show: "Changing Your World Broadcast", time: "3:30 – 3:45 PM", days: []
  },
  {
    slug: "prophet-kakra-baiden",
    honorific: "Prophet", name: "Kakra Baiden",
    title: "",
    photo: "prophet-kakra-baiden.jpg",
    show: "Word in Season", time: "3:45 – 4:00 PM", days: []
  },
  {
    slug: "bishop-divine-adjei",
    honorific: "Bishop Dr.", name: "Divine Adjei",
    title: "Founder, Calvary Life Chapel International",
    photo: "bishop-divine-adjei.jpg",
    show: "The Lord's Table", time: "4:00 – 4:30 PM", days: []
  }
];
