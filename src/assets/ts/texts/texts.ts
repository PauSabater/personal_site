
export const texts = {
    header: {
        links: ["projects", "how do I work", "skills"]
    },
    home: {
        topBanner: {
            desktop: {
                pretitle: "frontend dev",
                lines: ["casting <span>$ellipse$<span>light</span></span>", "to <span>$underline$<span>ideas</span></span>"]
            },
            mobile: {
                pretitle: "frontend dev",
                lines: ["casting", "light", "to<br>ideas"]
            },
            dateText: "Available for work"
        },
        intro: {
            title: "Hello. I am Pau.",
            textDesktop: [
                "I am a <span>frontend developer</span> striving",
                "for  <span>high quality interfaces</span> . With",
                "an eye for design and a multidisciplinary",
                "background, I can tackle with success",
                "<span>complex projects</span> and goals.",
            ],
            textMobile: [
                "I am a <span>frontend developer</span>",
                "striving for the <span>high</span>",
                "<span>quality interfaces.</span> With",
                "an eye for design and a",
                "multidisciplinary background",
                "I can tackle with success",
                "<span>complex projects</span> and goals.",
            ],
            Cta: {
                text: "Contact me",
                href: "/contact",
                color: "black"
            }
        },
        workBanner: {
            heading: {
                text: [
                    "Some of",
                    "my projects"
                ],
                align: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            text: [
                "I enjoy all stages of projects,",
                "from conception to release,",
                "testing and further improvements.",
                "Thanks to my professional",
                "experience, studies and",
                "self-teaching, I can bring work",
                "forward with a mature perspective."
            ],
            Cta: {
                text: "Check out all the projects",
                href: "/projects",
                color: "black",
                target: "_self"
            }
        },
        skillsBanner: {
            title: ".skills",
            skills: [
                {
                    name: "React",
                    icon: "react",
                    percentage: "75"
                },{
                    name: "LITElement",
                    icon: "lit",
                    percentage: "75"
                },{
                    name: "Typescript",
                    icon: "typescript",
                    percentage: "75"
                },{
                    name: "Javascript",
                    icon: "javascript",
                    percentage: "75"
                },{
                    name: "CSS / SCSS",
                    icon: "css",
                    percentage: "90"
                },{
                    name: "Storybook",
                    icon: "storybook",
                    percentage: "75"
                },{
                    name: "GSAP",
                    icon: "gsap",
                    percentage: "45"
                },{
                    name: "Git / Github / CI",
                    icon: "git",
                    percentage: "45"
                },{
                    name: "Figma",
                    icon: "figma",
                    percentage: "45"
                },{
                    name: "Wordpress",
                    icon: "git",
                    percentage: "75"
                },{
                    name: "Threejs / R3F",
                    icon: "three",
                    percentage: "30"
                },{
                    name: "Webpack",
                    icon: "webpack",
                    percentage: "60"
                }
            ]
        },
        methodSectionTexts: {
            title: "How do I $work?",
            methods: [
                {
                    title: "+ Think about the users, think about the devs",
                    description: "A feature could be awesome for the users, but a nightmare for your colleagues. And the other way round. A product will only really succeed if it works for both sides. That means: clean and maintainable code, avoid over-engineering, good UX and design and good performance."
                },
                {
                    title: "+ Keep in mind native solutions",
                    description: "Frameworks are a great way to deal with complexity and to avoid reinventing the wheel. However, on some occasions, native solutions can be a better a better fit as they can be the most performant, light and future proof."
                },
                {
                    title: "+ Good communication makes a better product",
                    description: "Product is best shaped when all sides have a say from their area of expertise. Developers have unique insights and ideas from their perspective. <span>Good communication</span> on all sides will improve the working atmosphere and create much better solutions !"
                },
                {
                    title: "+ Keep it simple",
                    description: "Simple solutions to complex problems are sometimes the most difficult to achieve and they might require a lot of planning and research, some call it simple complexity. But when found, they are the most maintainable and pleasant to work with. On the other hand, complex solutions to simple problems are a red light !"
                },
                {
                    title: "+ Aim for pretty",
                    description: "Pretty things can improve our well being in our every day life. From a nicely plated breakfast to a nice interface, a tidy documentation or clean piece of code. The effort is worth it !"
                },
                {
                    title: "+ Listen to and give contructive feedback",
                    description: "Feedback should be considered and should be given to others when needed as they are useful to grow and get aware of sides to improve. So, do me a favor and give me some feedback !"
                }
            ]
        }
    },
    projectsList: {
        title: "All projects",
        intro: 'Here are displayed the main projects I have worked on and the corresponding cases. More projects to be added soon !',
        projects: [
            {
                title: "/ WORK AT PAPERNEST",
                labels: ["professional experience"],
                text: "Work during my two years working as a frontend developer papernest",
                cta: {
                    text: "Visit case",
                    href: "papernest",
                    target: "_self",
                    color: "black",
                    isBold: false,
                    isLink: false
                },
                imgPath: "papernest.svg"
            },
            {
                title: "/ WEATHER FORECAST COMPONENT",
                labels: ["side project"],
                text: "React component to display weather forecasts",
                cta: {
                    text: "Visit case",
                    href: "weather-app",
                    target: "_self",
                    color: "black",
                    isBold: false,
                    isLink: false
                },
                imgPath: "mountains"
            },
            {
                title: "/ PERSONAL SITE",
                labels: ["side project"],
                text: "Site to be used as a playground and to display my work",
                cta: {
                    text: "Visit case",
                    href: "personal-site",
                    target: "_self",
                    color: "black",
                    isBold: false,
                    isLink: false
                },
                imgPath: "personal-site.svg"
            }
        ],
        bottomCta: {
            text: "check out my Github",
            href: "https://github.com/PauSabater?tab=repositories",
            color: "secondary",
            target: "_blank"
        },
    },
    weatherApp: {
        cityFinderTexts: {
            placeholder: "Enter your city",
            label: "Please enter your city",
            name: "Name hello"
        }
    }
}