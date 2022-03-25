import { Link } from "remix";
import { useOptionalUser } from "~/utils";
import { json, useLoaderData } from "remix";
import { client } from "~/clients/kontent";
import { Homepage } from "~/models/kontent/Homepage";
import { Ondrej } from '../models/kontent/Ondrej';

import indexStyles from '~/styles/index.css';
import { YoutubeFeed } from '../models/kontent/YoutubeFeed';

export const links = () => {
  return [{ rel: "stylesheet", href: indexStyles }];
};

export const loader = async () => {

  const response = await client.item<Homepage>("homepage")
    .toPromise();

  return json(response.data.item);
};



export default function Index() {
  const user = useOptionalUser();

  const homePage = useLoaderData<Homepage>();

  const ondrejsTilesComponents = homePage.elements.ondrejs.linkedItems.map((linkedItem) => {
    const item = linkedItem as Ondrej;
    if (!item) {
      return null
    };
    return (
      <div key={item.system.codename} className="text-center flex-auto">
        <img
          src={`${item.elements.profilePhoto.value[0].url}?format=auto`}
          alt={item.elements.name.value}
        />
      </div>
    )
  })

  const youtubeTileComponents = homePage.elements.youtubeFeeds.linkedItems.map(linkedItem => {
    debugger;
    const youtubeFeed = linkedItem as YoutubeFeed;
    if (!youtubeFeed) {
      return null
    };

    return (
      <div key={youtubeFeed.system.codename} className="text-center w-48">
        <a
          href={youtubeFeed.elements.url.value}>
          <img
            src={`${homePage.elements.youtubeTile.value[0].url}?format=auto`}
            alt={homePage.elements.youtubeTile.value[0].description + " to " + youtubeFeed.elements.url.value}
          />
        </a>
      </div>
    );
  })

  return (
    <main className="flex flex-col relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="lg:pb-18 relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pt-32">
              <div className="flex  space-x-4 avatars">
                {ondrejsTilesComponents}
              </div>
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-yellow-500 drop-shadow-md">
                  {homePage.elements.title.value}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl flex space-x-4">
          {youtubeTileComponents}
        </div>


        <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8">
          <div className="mt-6 flex flex-wrap justify-center gap-8">
            <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
              {user ? (
                <Link
                  to="/notes"
                  className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                >
                  View Notes for {user.email}
                </Link>
              ) : (
                <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                  <Link
                    to="/join"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600  "
                  >
                    Log In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
    </main >
  );
}
