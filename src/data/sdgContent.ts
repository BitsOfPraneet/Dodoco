export interface SDGBodySection {
    title: string;
    content: string;
    image?: string;
}

export interface SDGDetail {
    number: number;
    name: string;
    color: string;
    tagline: string;
    overview: string;
    wildfireLink: string;
    sections: SDGBodySection[];
    sources: string[];
}

export const sdgContent: Record<number, SDGDetail> = {
    13: {
        number: 13,
        name: "Climate Action",
        color: "#3F7E44",
        tagline: "Take urgent action to combat climate change and its impacts.",
        overview: "Climate change is increasing the frequency and intensity of extreme weather events, including wildfires. SDG 13 aims to build resilience and adaptive capacity to climate-related hazards.",
        wildfireLink: "Wildfires both contribute to and are fueled by climate change. As global temperatures rise, vegetation dries out, creating more fuel for fires. These fires then release massive amounts of CO2, further accelerating the greenhouse effect.",
        sections: [
            {
                title: "The Wildfire-Carbon Loop",
                content: "Boreal and tropical forests are critical carbon sinks. When they burn, decades or centuries of stored carbon are released into the atmosphere in days. In 2023, wildfires in Canada alone released more carbon than the annual emissions of many developed nations.",
            },
            {
                title: "Monitoring & Early Warning",
                content: "Target 13.1 focuses on strengthening resilience. Real-time satellite monitoring systems like NASA FIRMS (used in this dashboard) are vital tools for early detection, enabling faster response times to mitigate disaster.",
            }
        ],
        sources: ["UN SDG 13 Website", "World Resources Institute", "NASA Earth Data"]
    },
    15: {
        number: 15,
        name: "Life on Land",
        color: "#56C02B",
        tagline: "Protect, restore and promote sustainable use of terrestrial ecosystems.",
        overview: "SDG 15 focuses on halting biodiversity loss and protecting natural habitats. Wildfires are one of the single greatest threats to terrestrial biodiversity, capable of wiping out entire micro-ecosystems overnight.",
        wildfireLink: "Wildfire Watch directly supports Target 15.5 by providing data on how fires intersect with the habitats of endangered species listed on the IUCN Red List.",
        sections: [
            {
                title: "Habitat Fragmentation",
                content: "Beyond direct mortality, fires cause habitat fragmentation. This forces species into smaller, isolated areas where they are more vulnerable to predators and less able to find diverse mates, weakening the genetic pool.",
            },
            {
                title: "Forest Management",
                content: "Sustainable forest management (Target 15.2) involves controlled burns and fire-break planning. Understanding where fires are most likely to occur allows conservationists to prioritize where to build these defenses.",
            }
        ],
        sources: ["Wikipedia - Sustainable Development Goal 15", "UN Biodiversity Lab", "IUCN Red List"]
    },
    11: {
        number: 11,
        name: "Sustainable Cities",
        color: "#FD9D24",
        tagline: "Make cities and human settlements inclusive, safe, resilient and sustainable.",
        overview: "As urban areas expand into wildlands (the Wildland-Urban Interface or WUI), the risk to human life and property from wildfires increases exponentially.",
        wildfireLink: "SDG 11 Target 11.5 aims to significantly reduce the number of deaths and the number of people affected by disasters. Modern dashboards provide the situational awareness needed for urban planning and emergency evacuations.",
        sections: [
            {
                title: "The Wildland-Urban Interface (WUI)",
                content: "The WUI is the area where homes and businesses are built among flammable forests and grasslands. These areas are the most difficult to protect and experience the highest economic losses during fire events.",
            },
            {
                title: "Resilient Infrastructure",
                content: "Building codes and urban landscaping play a massive role in city resilience. Using fire-resistant materials and maintaining 'defensible space' around buildings can save entire neighborhoods.",
            }
        ],
        sources: ["UN-Habitat", "The Verge - Wildfire Urban Risk", "NFPA Firewise USA"]
    },
    14: {
        number: 14,
        name: "Life Below Water",
        color: "#0A97D9",
        tagline: "Conserve and sustainably use the oceans, seas and marine resources.",
        overview: "While it may seem counterintuitive, terrestrial wildfires have devastating impacts on marine and freshwater ecosystems.",
        wildfireLink: "Ash and burnt debris from coastal fires wash into the ocean during following rains, causing nutrient spikes that lead to algal blooms and mass fish die-offs (Target 14.2).",
        sections: [
            {
                title: "Sedimentation and Runoff",
                content: "After a fire, the soil loses its stability. Heavy rains wash this 'black carbon' and nutrient-rich ash into streams and eventually coastal waters, clogging the gills of fish and smothered coral reefs.",
            },
            {
                title: "Mangrove Protection",
                content: "Coastal mangroves act as natural fire breaks for sea-ward winds. Protecting these ecosystems is vital for both oceanic health and land-based fire defense.",
            }
        ],
        sources: ["NOAA Fisheries", "Ocean Conservancy", "UNESCO Marine Program"]
    },
    3: {
        number: 3,
        name: "Good Health",
        color: "#4C9F38",
        tagline: "Ensure healthy lives and promote well-being for all at all ages.",
        overview: "Wildfire smoke is a global health crisis. PM2.5 particles from smoke can travel thousands of miles, affecting air quality across entire continents.",
        wildfireLink: "SDG 3 Target 3.9 aims to reduce deaths and illnesses from hazardous chemicals and air pollution. Wildfires contribute significantly to respiratory and cardiovascular mortality.",
        sections: [
            {
                title: "Invisible Killers: PM2.5",
                content: "Wildfire smoke is rich in fine particulate matter (PM2.5) which is small enough to enter the bloodstream. Exposure is linked to asthma, heart attacks, and increased susceptibility to respiratory infections.",
            },
            {
                title: "Mental Health Impacts",
                content: "Displacement and the loss of homes or livelihoods to fire causes long-term psychological trauma, including PTSD and anxiety, particularly in vulnerable communities.",
            }
        ],
        sources: ["World Health Organization (WHO)", "The Lancet Planetary Health", "EPA AirNow"]
    },
    17: {
        number: 17,
        name: "Partnerships",
        color: "#19486A",
        tagline: "Strengthen the means of implementation and revitalize the Global Partnership.",
        overview: "No single nation can combat the global wildfire crisis alone. SDG 17 emphasizes the importance of data sharing and technological cooperation.",
        wildfireLink: "This dashboard is a manifestation of SDG 17, combining data from NASA (USA), GBIF (International), and IUCN (Switzerland) to provide a global public good for environmental monitoring (Target 17.18).",
        sections: [
            {
                title: "Open Data for Impact",
                content: "Target 17.6 focuses on international cooperation on science, technology, and innovation. Open access to satellite and biodiversity data is the backbone of modern environmental conservation.",
            },
            {
                title: "Capacity Building",
                content: "By providing easy-to-use tools, we enable local conservationists in developing nations to access the same high-level intelligence as global NGOs, democratizing environmental defense.",
            }
        ],
        sources: ["UN Sustainable Development Partners", "Global Partnership for Sustainable Development Data"]
    }
};
