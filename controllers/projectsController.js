exports.projectsHome = (req, res) => {
    res.render('Index',{
        pageName: "Projects"
    });
};
exports.projectsNewProjects = (req, res) => {
    res.render('new-projects',{
        pageName: "New project"
    });
};
