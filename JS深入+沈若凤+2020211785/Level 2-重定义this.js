function Course() {
    this.coursename = "CSA前端培训";
    this.semester = 2;
}
function Student(name, age, gender) {
    Course.apply(this, arguments)
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.moreInfo = function() {
        let	detail = function() {
            console.log(this.gender);
        }
        detail();
        console.log("!:", this.gender)
    }
}
// prototype 继承：
// Student.prototype = new Course()
// Student.prototype.constructor = Student;    // 不加则为Course

let student1 = new Student("小明", 18, "男");
console.log(student1.coursename,student1.semester);
student1.moreInfo();
// console.log(student1.gender)