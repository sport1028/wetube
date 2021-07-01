// const fakeUser = {
//     userName : "Muzik",
//     loggedIn : true
// }

const videos = [
	{
		title : "First Video",
		rating : 5,
		comments : 2,
		createdAt : "2 minutes ago",
		views : 59,
		id: 1
	},
	{
		title : "Second Video",
		rating : 5,
		comments : 2,
		createdAt : "2 minutes ago",
		views : 59,
		id: 1
	},
	{
		title : "Third Video",
		rating : 5,
		comments : 2,
		createdAt : "2 minutes ago",
		views : 59,
		id: 1
	},
];

export const trending = (req, res) => {
    res.render("home", {pageTitle : "Home", videos});
}
export const see = (req, res) => res.render("watch", {pageTitle : "Watch"});
export const edit = (req, res) => res.render("edit", {pageTitle : "Edit"});
export const remove = (req,res) => {
    console.log(req.params);
    res.send("Delete Video");
}
export const search = (req,res) => res.send("Search");
export const upload = (req,res) => res.send("Upload Video");