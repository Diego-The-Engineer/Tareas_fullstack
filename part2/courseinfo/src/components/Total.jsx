const Total = ({courses}) =>{
  return (
    <h4>
      total of {courses.parts.reduce((i, c) => {return i + c.exercises},0)} exercises
    </h4>
  )
}

export default Total