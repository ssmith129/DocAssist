import { BaseLayout } from "@/components/healthcare/BaseLayout";
import { StatsCard } from "@/components/healthcare/StatsCard";
import { NotificationPanel } from "@/components/healthcare/NotificationPanel";
import { AppointmentsTable } from "@/components/healthcare/AppointmentsTable";
import { PatientsTable } from "@/components/healthcare/PatientsTable";
import {
  PatientChart,
  PatientTypeChart,
} from "@/components/healthcare/PatientChart";
import { UserPlus, Users, Building2, UserCheck } from "lucide-react";

export default function Index() {
  return (
    <BaseLayout title="Overview">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="New patients"
          value="15"
          variant="primary"
          icon={
            <svg
              width="72"
              height="60"
              viewBox="0 0 72 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1_1300)">
                <path
                  d="M47 39.3334C44.8326 41.8212 42.0932 43.7126 39.0314 44.8351C35.9697 45.9576 32.683 46.2755 29.4709 45.7599C26.2588 45.2443 23.2236 43.9115 20.6417 41.883C18.0598 39.8545 16.0135 37.1949 14.6893 34.1465C13.365 31.0981 12.8049 27.7579 13.0601 24.4304C13.3152 21.1028 14.3775 17.8938 16.1501 15.0957C17.9226 12.2976 20.3491 9.99945 23.2083 8.41074C26.0675 6.82204 29.2686 5.9933 32.5197 6.00004C35.2538 6.00572 37.9562 6.60227 40.451 7.75087C42.9458 8.89947 45.1772 10.5744 47 12.6667"
                  stroke="#7C3AED"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.5248 42.0661C15.4856 43.9398 12.0716 46.8939 9.67809 50.5864C7.28454 54.279 6.99375 55.6281 6 60M60.0992 60C59.1182 55.6168 58.8335 54.2536 56.4392 50.5483C54.0449 46.8429 50.624 43.8785 46.5744 42"
                  stroke="#7C3AED"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M66 26H52M59 33V19"
                  stroke="#7C3AED"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_1300">
                  <rect width="72" height="60" fill="white" />
                </clipPath>
              </defs>
            </svg>
          }
        />
        <StatsCard
          title="Total patients"
          value="47"
          icon={
            <svg
              width="72"
              height="60"
              viewBox="0 0 72 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1_1309)">
                <circle
                  cx="36"
                  cy="26"
                  r="20"
                  stroke="#6EE7B7"
                  strokeWidth="6"
                />
                <path
                  d="M22.5248 42.0661C18.4856 43.9398 15.0716 46.8939 12.6781 50.5864C10.2845 54.279 9.99375 55.6281 9 60M63.0992 60C62.1182 55.6168 61.8335 54.2536 59.4392 50.5483C57.0449 46.8429 53.624 43.8785 49.5744 42"
                  stroke="#6EE7B7"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_1309">
                  <rect width="72" height="60" fill="white" />
                </clipPath>
              </defs>
            </svg>
          }
        />
        <StatsCard
          title="Rooms"
          value="76"
          icon={
            <svg
              width="72"
              height="60"
              viewBox="0 0 72 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1_1317)">
                <path
                  d="M36 31.8889V19.4444M42.3333 25.6667H29.6667M13 63H59V10.1111C59 9.28599 58.6664 8.49467 58.0725 7.91122C57.4786 7.32778 56.6732 7 55.8333 7H16.1667C15.3268 7 14.5214 7.32778 13.9275 7.91122C13.3336 8.49467 13 9.28599 13 10.1111V63ZM29.6667 63H42.3333V44.3333H29.6667V63Z"
                  stroke="#6EE7B7"
                  strokeWidth="5.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_1317">
                  <rect
                    width="72"
                    height="60"
                    fill="white"
                    transform="matrix(-1 0 0 1 72 0)"
                  />
                </clipPath>
              </defs>
            </svg>
          }
        />
        <StatsCard
          title="Staff members"
          value="31"
          icon={
            <svg
              width="72"
              height="60"
              viewBox="0 0 72 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1_1323)">
                <path
                  d="M22.0034 40.5V58C22.0034 61.7131 23.4784 65.274 26.1039 67.8995C28.7294 70.525 32.2904 72 36.0034 72H43.0034C46.7165 72 50.2774 70.525 52.903 67.8995C55.5285 65.274 57.0035 61.7131 57.0035 58V37"
                  stroke="#6EE7B7"
                  strokeWidth="5.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M32.5 9H36V26.5C36 30.213 34.525 33.774 31.8995 36.3995C29.274 39.025 25.7131 40.5 22 40.5C18.287 40.5 14.726 39.025 12.1005 36.3995C9.475 33.774 8 30.213 8 26.5V9H11.5M57.0001 37C55.6156 37 54.2622 36.5895 53.1111 35.8203C51.9599 35.0511 51.0627 33.9579 50.5329 32.6788C50.0031 31.3997 49.8645 29.9923 50.1346 28.6344C50.4047 27.2765 51.0713 26.0292 52.0503 25.0503C53.0293 24.0713 54.2766 23.4046 55.6344 23.1345C56.9923 22.8644 58.3998 23.003 59.6789 23.5329C60.9579 24.0627 62.0512 24.9599 62.8204 26.111C63.5895 27.2622 64.0001 28.6155 64.0001 30C64.0001 31.8565 63.2626 33.637 61.9498 34.9498C60.6371 36.2625 58.8566 37 57.0001 37Z"
                  stroke="#6EE7B7"
                  strokeWidth="5.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_1323">
                  <rect width="72" height="60" fill="white" />
                </clipPath>
              </defs>
            </svg>
          }
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Today's Appointments - Left Side */}
        <div className="col-span-7">
          <AppointmentsTable />
        </div>

        {/* Notifications - Top Right */}
        <div className="col-span-5 flex flex-col space-y-6">
          <NotificationPanel />
          <PatientTypeChart />
        </div>

        {/* Patients List - Bottom Left */}
        <div className="col-span-5">
          <PatientsTable />
        </div>

        {/* Patient Chart - Bottom Right */}
        <div className="col-span-7">
          <PatientChart />
        </div>
      </div>
    </BaseLayout>
  );
}
