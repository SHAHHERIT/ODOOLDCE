import BackgroundVideo from "../components/BackgroundVideo";
import DestinationCard from "../components/DestinationCard";
import { mockDestinations } from "../data/mockDestinations";
<BackgroundVideo src="c:\Users\HERITSHAH\Downloads\From Klickpin.com- 1149332767436870831-pin-id-1149332767436870831.mp4" className="h-screen min-h-[640px]"></BackgroundVideo>
export default function Explore() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-10">
      <p className="eyebrow">Field notes</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-ivory md:text-5xl">
        Explore Destinations
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        A running list of places worth the layover — pulled from trips our
        travelers have planned and shared.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockDestinations.map((d) => (
          <DestinationCard key={d.id} destination={d} />
        ))}
      </div>
    </div>
  );
}
