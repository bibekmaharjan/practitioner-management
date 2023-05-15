import * as React from 'react';

import { useNavigate } from 'react-router-dom';

interface BreadcrumbProps {
  name: string | undefined;
}

const Breadcrumb = (props: BreadcrumbProps) => {
  const navigate = useNavigate();

  return (
    <section className="breadcrumb">
      <span className="text__label-color mr-sm cursor-pointer" onClick={() => navigate('/')}>
        Practitioner List
      </span>
      <span className="text__label-muted mr-sm"> &gt; </span>
      <span className="text__label-muted mr-sm"> {props.name} </span>
    </section>
  );
};

export default Breadcrumb;
