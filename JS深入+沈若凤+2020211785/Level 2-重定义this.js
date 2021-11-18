function Course() {
    this.coursename = "CSA前端培训";
    this.semester = 2;
}
function Student(name, age, gender) {
    Course.apply(this, arguments);  // Constructor stealing继承
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.moreInfo = function() {
        let	detail = function() {
            console.log(this.gender);
        }
        // 第一种：
        detail.apply(this);
    }
    // 第二种：
    // this.moreInfo = () => {
    //     let	detail = () => {
    //         console.log(this.gender);
    //     }
    //     detail();
    // }
}

let student1 = new Student("小明", 18, "男");
console.log(student1.coursename, student1.semester);
student1.moreInfo();
