const Header = (props) =>{
  return <h1> Hello, this is my {props.course.name} course </h1>
} 

const Part = (props) => {
  return <p>{props.name} {props.exercises}</p>
}

const Content = (props) => {
  return (
    <>
      <Part name={props.course.parts[0].name} exercises={props.course.parts[0].exercises}/>
      <Part name={props.course.parts[1].name} exercises={props.course.parts[1].exercises}/>
      <Part name={props.course.parts[2].name} exercises={props.course.parts[2].exercises}/>
    </>
  )
}

const Total = (props) => {
  const totalExercises = props.course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p> Number of exercises {totalExercises}</p>
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course}/>
      <Total  course= {course}/>
    </div>
  )
}

export default App