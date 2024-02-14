import { useGetLocale } from "@/config";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type Props = {
  testimonials: {
    author: string;
    testimonial: LocalizedText;
    image?: Image | undefined;
  }[];
  selectedTestimonial: number;
  setSelectedTestimonial: React.Dispatch<React.SetStateAction<number>>;
};

const TestimonialItems: React.FC<Props> = ({
  testimonials,
  selectedTestimonial,
  setSelectedTestimonial,
}) => {
  const locale = useGetLocale();

  const previous = () =>
    setSelectedTestimonial((testimonial) =>
      testimonial === 0 ? testimonials.length - 1 : testimonial - 1
    );

  const next = () =>
    setSelectedTestimonial((testimonial) =>
      testimonial === testimonials.length - 1 ? 0 : testimonial + 1
    );

  return (
    <div className="md:max-w-[577px] md:w-max flex-1 md:-mr-24 z-10 green-bg px-10 lg:px-20 py-16 h-full mb-2">
      <div className="flex flex-col gap-11 items-center text-light">
        <div className="flex items-center justify-center gap-20 w-full">
          <button
            title="Previous testimonial"
            aria-live="polite"
            onClick={previous}
          >
            <ArrowLeftIcon width={24} height={24} />
          </button>
          <span className="text-lg">
            {testimonials[selectedTestimonial].author}
          </span>
          <button title="Next testimonial" aria-live="polite" onClick={next}>
            <ArrowRightIcon width={24} height={24} />
          </button>
        </div>
        <p className="text-body text-center">
          {testimonials[selectedTestimonial].testimonial[locale]}
        </p>
      </div>
    </div>
  );
};

export default TestimonialItems;
