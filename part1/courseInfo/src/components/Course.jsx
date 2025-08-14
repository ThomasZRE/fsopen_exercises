const Course = (props) => {

  const Header = (props) => <h2>{props.course}</h2>

  const Content = (props) => {
    console.log("Content")
    return (
    <div>
      {props.parts.map((part, id) => <Part key={id} part={part} />)}
    </div>
    )
  }

  const Part = (props) => (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )

  const Total = (props) => (
    <p>
      <strong>Total of {props.parts.reduce((s, p) => s + p.exercises, 0)} exercises</strong>
    </p>
  )


  return (
    <div>
      <h1>Web Develoment Curriculum</h1>
      {props.courses.map((course, id) => ( 
          <div key={id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
          </div>
        )
      )}
    </div>
  )
}

export default Course