import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import courses from '../data/courses';

const Course = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const course = courses.find((item) => slug === item.slug);

  useEffect(() => {
    if (!course) {
      navigate('..', { relative: 'path' });
    }
  }, [course, navigate]);

  return (
    <>
      <p>Course ID: {course?.id}</p> <h2>{course?.title}</h2>
      <Link to=".." relative="path">
        Go to All courses
      </Link>
    </>
  );
};

export default Course;
