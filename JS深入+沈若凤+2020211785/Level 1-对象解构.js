const course = {
    name: "CSA",
    semester: 2
};
let {name, semester: year, isStudent = true} = course;
console.log(name, year, isStudent)