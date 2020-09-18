# ArtistKey: Management Dashboard

ArtistKey is a SPA designed to help artist managers benchmark where their artists are financially based on the average payout rate from Spotify streams. Right now, that rate sits at about $0.00318, quite low! ArtistKey allows managers to keep track of how their releases are performing monetarily.

Eventually, the application will be expanded into being able to track payout rates from multiple DSPs, such as Apple Music, Amazon, YouTube and more.

## Setup Steps

1. [Fork and clone](https://git.generalassemb.ly/ga-wdi-boston/meta/wiki/ForkAndClone) this repository.
2. Change directories to be in the artistkey-client directory.
3. Run `npm install` to install all dependencies.
4. Checkout to a new branch
5. Use `npm run start` to spin up the server.

## Important Links

- [ArtistKey API](https://github.com/rainswerld/artistkey-api)
- [Deployed Client](www.link.com)
- [Deployed API](www.link.com)

## Planning Story

The vision for ArtistKey is to be the go to dashboard for managers to check the monetary success of their artists and help them make educated decisions in the future.

I used Notion to keep track of the models I needed to make in Django, the serializers and views that were needed to format and return the data properly to the client, and the components I needed to build in React. By breaking it down like this, I was able to focus on the functionality of one given resource at a time. This ensured that I wouldn't move on to the frontend until the backend was totally set; the models looked good, I could properly CRUD in the Django CMS, etc. Then I moved onto the front end and worked on one component at a time - CRUD-ing from the client on one resource at a time (Artist, then Track).

I focused intently on how I set up my wireframes and what my user stories are in order for the user to have a great experience while using ArtistKey.

### Version 1 User Stories

- As a user, I would like to signup, signin, signout, and change password while signed in.
- As a user, I would like to be able to create 'Artists' by adding them from the Spotify API
- As a user, I would like my 'Artists' to have 'Tracks' associated with them that are taken from the Spotify API
- As a user, I would like to see my expected revenue based on current average Spotify payout rate compared agains the number of streams a certain track has

### Technologies Used

- JavaScript
- HTML/CSS
- React
- React-Bootstrap
- React-Router
- Axios

### Future Iterations

Some additions I will be making on the Track Model:
- Contract splits (to allow managers to more acturately understand how much they will be paid)
- Numbers all display as comma separated values (i.e. 1,000 instead of 1000)
- Connect to the Spotify API to retrieve artist data
- Connect to other DSP APIs to retrieve data from them (Shazam, Apple Music, etc)

## Images

#### App Screenshot:
![screenshot](https://imgur.com/5myfmKE)

---

#### Wireframe:
[Wireframe](https://miro.com/app/board/o9J_klImQWM=/)
