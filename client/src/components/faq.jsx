import React, { useEffect, useState } from "react";
import { useGetSingleLayoutQuery } from "../features/layout/layoutApiSlice";

const FAQ = () => {
  const [faqOpen, setFaqOpen] = useState([]);
  const { data, isLoading } = useGetSingleLayoutQuery("faq", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const layout = data?.layout[0]?.faq;

  useEffect(() => {
    if (layout) {
      setFaqOpen(new Array(layout.length).fill(false));
    }
  }, [layout]);
  return (
    layout && (
      <div
        id="accordion-collapse"
        data-accordion="collapse"
        className="max-w-[1200px] mx-auto px-4 my-10"
      >
        {layout.map((l, index) => {
          return (
            <>
              <h2 id="accordion-collapse-heading-1">
                <button
                  type="button"
                  onClick={() =>
                    setFaqOpen((p) => {
                      const pre = [...p];
                      pre[index] = !pre[index];
                      return pre;
                    })
                  }
                  class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-300   "
                  data-accordion-target="#accordion-collapse-body-1"
                >
                  <span>{l.question}</span>
                  <svg
                    data-accordion-icon
                    class={`w-3 h-3 ${
                      !faqOpen[index] && `rotate-180`
                    } transition shrink-0`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              <div
                class={`${!faqOpen[index] && `hidden`}`}
                aria-labelledby="accordion-collapse-heading-1"
              >
                <div class="p-5 border border-b-0 border-gray-300 ">
                  <p class="mb-2 text-gray-500 dark:text-gray-400">
                    {l.answer}
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    )
  );
};

export default FAQ;
