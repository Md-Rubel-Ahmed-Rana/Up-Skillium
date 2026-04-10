import { ILesson } from "@/types/lesson.type";
import makeLessonTitleAsParamsUrl from "@/utils/makeLessonTitleAsParamsUrl";
import { Button, Dropdown, Input, MenuProps } from "antd/lib";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { IoSearch } from "react-icons/io5";

type Props = {
  lessons: ILesson[];
};

const LessonSearch = ({ lessons }: Props) => {
  const { query, push } = useRouter();
  const courseId = query?.courseId as string;
  const allLessons: { id: string; title: string }[] = lessons.map((ls) => ({
    id: ls?.id,
    title: ls?.title,
  }));

  const [searchText, setSearchText] = useState("");
  const [filteredLessons, setFilteredLessons] = useState(allLessons);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleSearchValue = useCallback(
    (text: string) => {
      setSearchText(text);
      if (text) {
        setFilteredLessons(
          allLessons.filter((lesson) =>
            lesson.title.toLowerCase().includes(text.toLowerCase())
          )
        );
      } else {
        setFilteredLessons(allLessons);
      }
    },
    [allLessons]
  );

  const handleFocus = () => setDropdownVisible(true);
  const handleBlur = () => setDropdownVisible(false);

  const handleSelectLesson = (lesson: { id: string; title: string }) => {
    push(
      `/classes/${courseId}?lessonId=${
        lesson?.id
      }&lessonTitle=${makeLessonTitleAsParamsUrl(lesson?.title)}`
    );
    setDropdownVisible(false);
  };

  const items: MenuProps["items"] =
    filteredLessons.length > 0
      ? filteredLessons.map((lesson) => ({
          key: lesson?.id,
          label: (
            <Button
              onMouseDown={() => handleSelectLesson(lesson)}
              className="w-full flex justify-start items-start"
              type="default"
              size="large"
            >
              {lesson?.title}
            </Button>
          ),
        }))
      : [
          {
            key: "no-results",
            label: (
              <div className="px-4 py-2 text-gray-500">No lessons found</div>
            ),
            disabled: true,
          },
        ];

  return (
    <div className="w-full">
      <Dropdown
        open={isDropdownVisible}
        onOpenChange={setDropdownVisible}
        menu={{ items }}
        overlayClassName="w-full max-w-md"
      >
        <Input
          type="search"
          placeholder="Search lesson..."
          prefix={<IoSearch className="text-gray-400" />}
          className="w-full p-3"
          allowClear
          size="large"
          value={searchText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => handleSearchValue(e.target.value)}
        />
      </Dropdown>
    </div>
  );
};

export default LessonSearch;
