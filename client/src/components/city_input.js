import React, { Component } from 'react';
let all_sites=["Alabama",
"auburn",
"birmingham",
"dothan",
"florence / muscle shoals",
"gadsden-anniston",
"huntsville / decatur",
"mobile",
"montgomery",
"tuscaloosa",
"Alaska",
"anchorage / mat-su",
"fairbanks",
"kenai peninsula",
"southeast alaska",
"Arizona",
"flagstaff / sedona",
"mohave county",
"phoenix",
"prescott",
"show low",
"sierra vista",
"tucson",
"yuma",
"Arkansas",
"fayetteville",
"fort smith",
"jonesboro",
"little rock",
"texarkana",
"California",
"bakersfield",
"chico",
"fresno / madera",
"gold country",
"hanford-corcoran",
"humboldt county",
"imperial county",
"inland empire",
"los angeles",
"mendocino county",
"merced",
"modesto",
"monterey bay",
"orange county",
"palm springs",
"redding",
"sacramento",
"san diego",
"san francisco bay area",
"san luis obispo",
"santa barbara",
"santa maria",
"siskiyou county",
"stockton",
"susanville",
"ventura county",
"visalia-tulare",
"yuba-sutter",
"Colorado",
"boulder",
"colorado springs",
"denver",
"eastern CO",
"fort collins / north CO",
"high rockies",
"pueblo",
"western slope",
"Connecticut",
"eastern CT",
"hartford",
"new haven",
"northwest CT",
"Delaware",
"delaware",
"District of Columbia",
"washington",
"Florida",
"broward county",
"daytona beach",
"florida keys",
"fort lauderdale",
"ft myers / SW florida",
"gainesville",
"heartland florida",
"jacksonville",
"lakeland",
"miami / dade",
"north central FL",
"ocala",
"okaloosa / walton",
"orlando",
"panama city",
"pensacola",
"sarasota-bradenton",
"south florida",
"space coast",
"st augustine",
"tallahassee",
"tampa bay area",
"treasure coast",
"palm beach county",
"Georgia",
"albany",
"athens",
"atlanta",
"augusta",
"brunswick",
"columbus",
"macon / warner robins",
"northwest GA",
"savannah / hinesville",
"statesboro",
"valdosta",
"Hawaii",
"hawaii",
"Idaho",
"boise",
"east idaho",
"lewiston / clarkston",
"twin falls",
"Illinois",
"bloomington-normal",
"champaign urbana",
"chicago",
"decatur",
"la salle co",
"mattoon-charleston",
"peoria",
"rockford",
"southern illinois",
"springfield",
"western IL",
"Indiana",
"bloomington",
"evansville",
"fort wayne",
"indianapolis",
"kokomo",
"lafayette / west lafayette",
"muncie / anderson",
"richmond",
"south bend / michiana",
"terre haute",
"Iowa",
"ames",
"cedar rapids",
"des moines",
"dubuque",
"fort dodge",
"iowa city",
"mason city",
"quad cities",
"sioux city",
"southeast IA",
"waterloo / cedar falls",
"Kansas",
"lawrence",
"manhattan",
"northwest KS",
"salina",
"southeast KS",
"southwest KS",
"topeka",
"wichita",
"Kentucky",
"bowling green",
"eastern kentucky",
"lexington",
"louisville",
"owensboro",
"western KY",
"Louisiana",
"baton rouge",
"central louisiana",
"houma",
"lafayette",
"lake charles",
"monroe",
"new orleans",
"shreveport",
"Maine",
"maine",
"Maryland",
"annapolis",
"baltimore",
"eastern shore",
"frederick",
"southern maryland",
"western maryland",
"Massachusetts",
"boston",
"cape cod / islands",
"south coast",
"western massachusetts",
"worcester / central MA",
"Michigan",
"ann arbor",
"battle creek",
"central michigan",
"detroit metro",
"flint",
"grand rapids",
"holland",
"jackson",
"kalamazoo",
"lansing",
"monroe",
"muskegon",
"northern michigan",
"port huron",
"saginaw-midland-baycity",
"southwest michigan",
"the thumb",
"upper peninsula",
"Minnesota",
"bemidji",
"brainerd",
"duluth / superior",
"mankato",
"minneapolis / st paul",
"rochester",
"southwest MN",
"st cloud",
"Mississippi",
"gulfport / biloxi",
"hattiesburg",
"jackson",
"meridian",
"north mississippi",
"southwest MS",
"Missouri",
"columbia / jeff city",
"joplin",
"kansas city",
"kirksville",
"lake of the ozarks",
"southeast missouri",
"springfield",
"st joseph",
"st louis",
"Montana",
"billings",
"bozeman",
"butte",
"great falls",
"helena",
"kalispell",
"missoula",
"eastern montana",
"Nebraska",
"grand island",
"lincoln",
"north platte",
"omaha / council bluffs",
"scottsbluff / panhandle",
"Nevada",
"elko",
"las vegas",
"reno / tahoe",
"New Hampshire",
"new hampshire",
"New Jersey",
"central NJ",
"jersey shore",
"north jersey",
"south jersey",
"New Mexico",
"albuquerque",
"clovis / portales",
"farmington",
"las cruces",
"roswell / carlsbad",
"santa fe / taos",
"New York",
"albany",
"binghamton",
"buffalo",
"catskills",
"chautauqua",
"elmira-corning",
"finger lakes",
"glens falls",
"hudson valley",
"ithaca",
"long island",
"new york city",
"oneonta",
"plattsburgh-adirondacks",
"potsdam-canton-massena",
"rochester",
"syracuse",
"twin tiers NY/PA",
"utica-rome-oneida",
"watertown",
"North Carolina",
"asheville",
"boone",
"charlotte",
"eastern NC",
"fayetteville",
"greensboro",
"hickory / lenoir",
"jacksonville",
"outer banks",
"raleigh / durham / CH",
"wilmington",
"winston-salem",
"North Dakota",
"bismarck",
"fargo / moorhead",
"grand forks",
"north dakota",
"Ohio",
"akron / canton",
"ashtabula",
"athens",
"chillicothe",
"cincinnati",
"cleveland",
"columbus",
"dayton / springfield",
"lima / findlay",
"mansfield",
"sandusky",
"toledo",
"tuscarawas co",
"youngstown",
"zanesville / cambridge",
"Oklahoma",
"lawton",
"northwest OK",
"oklahoma city",
"stillwater",
"tulsa",
"Oregon",
"bend",
"corvallis/albany",
"east oregon",
"eugene",
"klamath falls",
"medford-ashland",
"oregon coast",
"portland",
"roseburg",
"salem",
"Pennsylvania",
"altoona-johnstown",
"cumberland valley",
"erie",
"harrisburg",
"lancaster",
"lehigh valley",
"meadville",
"philadelphia",
"pittsburgh",
"poconos",
"reading",
"scranton / wilkes-barre",
"state college",
"williamsport",
"york",
"Rhode Island",
"rhode island",
"South Carolina",
"charleston",
"columbia",
"florence",
"greenville / upstate",
"hilton head",
"myrtle beach",
"South Dakota",
"northeast SD",
"pierre / central SD",
"rapid city / west SD",
"sioux falls / SE SD",
"south dakota",
"Tennessee",
"chattanooga",
"clarksville",
"cookeville",
"jackson",
"knoxville",
"memphis",
"nashville",
"tri-cities",
"Texas",
"abilene",
"amarillo",
"austin",
"beaumont / port arthur",
"brownsville",
"college station",
"corpus christi",
"dallas / fort worth",
"deep east texas",
"del rio / eagle pass",
"el paso",
"galveston",
"houston",
"killeen / temple / ft hood",
"laredo",
"lubbock",
"mcallen / edinburg",
"odessa / midland",
"san angelo",
"san antonio",
"san marcos",
"southwest TX",
"texoma",
"tyler / east TX",
"victoria",
"waco",
"wichita falls",
"Utah",
"logan",
"ogden-clearfield",
"provo / orem",
"salt lake city",
"st george",
"Vermont",
"vermont",
"Virginia",
"charlottesville",
"danville",
"fredericksburg",
"hampton roads",
"harrisonburg",
"lynchburg",
"new river valley",
"richmond",
"roanoke",
"southwest VA",
"winchester",
"Washington",
"bellingham",
"kennewick-pasco-richland",
"moses lake",
"olympic peninsula",
"pullman / moscow",
"seattle-tacoma",
"skagit / island / SJI",
"spokane / coeur d'alene",
"wenatchee",
"yakima",
"West Virginia",
"charleston",
"eastern panhandle",
"huntington-ashland",
"morgantown",
"northern panhandle",
"parkersburg-marietta",
"southern WV",
"west virginia (old)",
"Wisconsin",
"appleton-oshkosh-FDL",
"eau claire",
"green bay",
"janesville",
"kenosha-racine",
"la crosse",
"madison",
"milwaukee",
"northern WI",
"sheboygan",
"wausau",
"Wyoming",
"wyoming",
"Territories",
"guam-micronesia",
"puerto rico",
"U.S. virgin islands"]

class city_input extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  citySelector = event => {
    this.props.handleCityEntry(event)
    const matches = all_sites.filter(site => site.includes(event.target.value.toLowerCase()));
    console.log(matches)
    if (matches.length === 1){
      this.props.handleCityEntry(matches)
      this.props.handleCitySelection(matches)
    } else {
      this.props.handleCityEntry(event.target.value)
      // this.setState({selectedCity: event.target.value})
    }
  }
  render () {
    return(
        <div>
          <label className="input-group-field">
          City Selector
            <input
              value={this.props.selectedCity}
              className="input-group-field"
              type="text"
              onChange={this.citySelector}
            />
          </label>
        </div>
    )
  }
}
export default city_input;