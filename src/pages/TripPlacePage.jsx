import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';

import pocketbase from '@/api/pocketbase';
import TripHeader from '@/components/Header/TripHeader';
import HambugerButton from '@/components/TripSelect/HambugerButton';
import MapPlace from '@/components/TripSelect/MapPlace';
import TripPlaceItem from '@/components/TripSelect/TripPlaceItem';
import TripPlanMenu from '@/components/TripSelect/TripPlanMenu';
import AddPlaceItem from '@/components/TripSelect/AddPlaceItem';
import useFetchMySchedule from '@/hooks/useFetchMySchedule';
import { useMapStore } from '@/store/mapStore';
import { useToggleTripMenuStore } from '@/store/toggleTripMenuStore';
import { useScheduleStore } from '@/store/scheduleStore';

export default function TripPlacePage() {
  const {
    displayPlaceTripPlan,
    displayPlaceList,
    togglePlaceTripPlan,
    togglePlaceList,
  } = useToggleTripMenuStore(); // 토글 메뉴

  const { placeList } = useMapStore(); // 지도에 표시되는 숙소 목록

  const { placePositions } = useScheduleStore(); // 추가한 장소 목록

  const currentIndex = useParams().indexId; // 현재 경로

  const user = pocketbase.authStore.model; // 로그인 유저 정보

  // 현재 선택한 schedule 데이터
  const { data } = useQuery(
    ['mySchedule', user.id],
    () => useFetchMySchedule(user.id),
    { refetchOnWindowFocus: false }
  );

  return (
    <>
      <Helmet>
        <title>TripPlace - WonT</title>
      </Helmet>
      <section className="container relative mx-auto min-h-[50rem]">
        <h1 className="sr-only">여행 장소 선택 페이지</h1>
        <TripHeader />
        <TripPlanMenu
          state={displayPlaceTripPlan}
          action={togglePlaceTripPlan}
          data={data}
        />
        <div className="map_wrap relative">
          <MapPlace placeName={data?.title} />
          {/*  <ul
            id="category"
            className="modal absolute left-3 top-3 z-10 flex gap-1 overflow-hidden rounded-md border border-solid border-primary bg-background"
          >
            <li id="CT1" data-order="0">
              <span className="cultural"></span>
              문화시설
            </li>
            <li id="AT4" data-order="1">
              <span className="attractions"></span>
              관광명소
            </li>
            <li id="FD6" data-order="2">
              <span className="restaurant"></span>
              음식점
            </li>
            <li id="CE7" data-order="3">
              <span className="cafe"></span>
              카페
            </li>
          </ul> */}
        </div>

        <ul
          id="placesList"
          className="mx-7 my-7 flex h-[23.1875rem] flex-col gap-[0.5625rem] overflow-y-scroll sm:h-[28.5625rem] md:grid md:grid-cols-2 lg:grid-cols-3 xl:h-[34.5rem]"
        >
          {placeList?.map((place, index) => (
            <TripPlaceItem
              key={place.id}
              placeName={place.place_name}
              address={place.address_name}
              count={index}
            />
          ))}
        </ul>
        <div className="modal absolute bottom-0 z-10 w-full rounded-t-3xl bg-[#E4F5FF]">
          <HambugerButton onClick={togglePlaceList} />
          {displayPlaceList && (
            <div className="mx-[1.8125rem] mt-[0.5rem] min-h-[7.125rem]">
              <h2 className="mb-[0.625rem] text-base font-light text-contentsPrimary">
                장소
              </h2>
              {Array.isArray(placePositions[currentIndex]) ? (
                <ul className="mb-[0.625rem] flex max-h-[9.5rem] flex-col gap-[0.625rem] overflow-y-scroll md:grid md:grid-cols-2 lg:grid-cols-4">
                  {placePositions[currentIndex]?.map((item, index) => (
                    <AddPlaceItem
                      placeName={item.place_name}
                      count={index + 1}
                    />
                  ))}
                </ul>
              ) : (
                <span className="absolute left-1/2 top-1/2 -translate-x-[4.5rem] text-lg font-medium text-[#5A80A9]/50">
                  장소를 추가해주세요.
                </span>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
