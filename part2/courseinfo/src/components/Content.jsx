import Part from './Part'

const Content = ({courses}) => {
  return (
    <>
      {courses.parts.map(part =>
        <Part 
          key={part.id}
          name={part.name}
          exercises={part.exercises}
        />
      )}
    </>
  )
}

export default Content