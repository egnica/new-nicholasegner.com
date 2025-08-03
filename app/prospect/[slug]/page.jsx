"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import newProspect from "../../../prospect.json";
import ProspectCarousel from "../../components/prospectCarousel";

function Prospect() {
  const params = useParams();
  const { slug } = params;
  const prospectObject = newProspect.find((obj) => obj.slug == slug);

  if (!prospectObject) return notFound();

  return (
    <div>
      <div>
        <h1>{prospectObject.company}</h1>
        <h2>{prospectObject.personName}</h2>
        <p dangerouslySetInnerHTML={{ __html: prospectObject.mainBody }}></p>
      </div>
      <ProspectCarousel prospectArray={prospectObject.ideas} />
    </div>
  );
}

export default Prospect;
