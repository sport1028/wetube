import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Create Account" });
export const postJoin = async (req, res) => {
    console.log(req.body);
    const { name, username, email, password, password2, location} = req.body;
    const pageTitle = "Join";
    if(password !== password2) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "Password confirmation does not match",
        });
    }
    const exists = await User.exists({$or: [{username}, {email} ]});
    if(exists) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "This username/email is already taken",
        });
    }
    // const emailExists = await User.exists({email}); // 이렇게 둘을 갈라서 사용해도 되지만 $or operator를 사용해도 된다.
    // if(emailExists) {
    //	return res.render("join", {
    //		pageTitle,
    //		errorMessage: "This email is already taken",
    //	});
    // }
    try{
        await User.create({
            name,
            username,
            email,
            password,
            location,
        })
    } catch(error) {
		console.log(error);
		return res.status(400).render("join", {
			pageTitle: "Upload Video",
			errorMessage: error._message,
		});
	}
    
    return res.redirect("/login");
};

export const getLogin = (req,res) => res.render("login", {pageTitle: "Login"});
export const postLogin = async (req, res) => {
    const {username, password} = req.body;
    const exists = await User.exists({ username });
    if(!exists) {
        return res.status(400).render("login", {
            pageTitle: "Login", 
            errorMessage: "An account with this username does not exists.",
        });
    }

    res.end();
}

export const edit = (req, res) => res.send("Edit User");
export const remove = (req,res) => res.send("Delete User");
export const logout = (req,res) => res.send("Log Out");
export const see = (req,res) => res.send("see");
