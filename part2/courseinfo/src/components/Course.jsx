import Total from './Total'
import Content from './Content'
import Header from './Header'

const Course = ({courses}) => {
  return (
      <>
        <Header courses={courses}/>
        <Content courses={courses}/>
        <Total courses={courses}/>
      </>
  )
}

export default Course