import { useEffect, useState } from "react";
import "../components/Pod.css";

// Represents a Picture of the Day (POD).
interface PodInterface {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

// The properties expected for this component.
interface Props {
  queryDate: string;
}

// API call to get the Astronomical Picture of the Day.
async function getPod(date?: string): Promise<PodInterface> {
  let query = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";

  if (date) {
    query += "&date=" + date;
  }

  const response = await fetch(query);
  const body = await response.json();
  return body;
}

// React component.
const Pod = ({ queryDate }: Props) => {
  // useState() must be initialized to a blank PodInterface.
  const blankPI: PodInterface = {
    copyright: "",
    date: "",
    explanation: "",
    hdurl: "",
    media_type: "",
    service_version: "",
    title: "",
    url: "",
  };

  // 'pod' represents the API response object.
  const [pod, setPod] = useState(blankPI);

  // This is how we have to use our asynchronous API call from a non-async component.
  useEffect(() => {
    (async () => {
      const _pod = await getPod(queryDate);
      setPod(_pod);
    })();
  }, [queryDate]);

  return (
    <div className="pod">
      <h2>{pod.title}</h2>
      <figure>
        {pod.media_type == "image" ? (
          <img src={pod.url} />
        ) : pod.media_type == "video" ? (
          <iframe src={pod.url}></iframe>
        ) : (
          <p>Unsupported media type</p>
        )}
        <figcaption>
          <em>{"Copyright: " + (pod.copyright || "public domain")}</em>
        </figcaption>
      </figure>
      <hr />
      <p>{pod.explanation}</p>
      <a href={pod.hdurl} target="_blank">
        Click here to view the high resolution image.
      </a>
    </div>
  );
};

export default Pod;
