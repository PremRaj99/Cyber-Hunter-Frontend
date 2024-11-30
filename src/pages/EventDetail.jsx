// import React from 'react';

import EventDescription from "../components/Event/EventDescription";
import Eventdetails from "../components/Event/EventdetailHero";

export default function EventDetail() {
  return (
    <div>
      <Eventdetails />
      <hr className="mx-5 m-8 md:mx-72" />
      <EventDescription/>
    </div>
  );
}
