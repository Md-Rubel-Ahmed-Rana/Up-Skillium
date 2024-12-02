import { ITeamMember } from "@/types/instructor";
import { animate, motion, useMotionValue } from "framer-motion";
import React, { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import MemberCard from "./MemberCard";

interface TeamMembersProps {
  direction: "left-to-right" | "right-to-left";
  members: ITeamMember[];
}

const TeamMembers: React.FC<TeamMembersProps> = ({ direction, members }) => {
  const FAST_DURATION = 25;
  const SLOW_DURATION = 100;

  const [duration, setDuration] = useState(FAST_DURATION);
  const [ref, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);

  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    let controls;
    const startPosition = direction === "left-to-right" ? -width / 2 - 8 : 0; // Dynamic start
    const finalPosition =
      direction === "left-to-right" ? width / 2 + 8 : -width / 2 - 8; // Dynamic end

    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [startPosition, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  }, [rerender, xTranslation, duration, width, mustFinish, direction]);

  return (
    <div className="relative overflow-hidden h-[300px]">
      <motion.div
        className="absolute left-0 flex gap-4"
        style={{ x: xTranslation }}
        ref={ref}
        onHoverStart={() => {
          setMustFinish(true);
          setDuration(SLOW_DURATION);
        }}
        onHoverEnd={() => {
          setMustFinish(true);
          setDuration(FAST_DURATION);
        }}
      >
        {members.map((member) => (
          <MemberCard member={member} key={member.id} />
        ))}
      </motion.div>
    </div>
  );
};

export default TeamMembers;
