"use client";

import React, { useEffect, useState } from "react";

interface Props {
  date: string; // The UTC date string from the server
  className: string;
  relative: boolean;
}

export default function ClientFormattedDate({
  date,
  className,
  relative,
}: Props) {
  const [formattedDate, setFormattedDate] = useState<string>(date);

  useEffect(() => {
    if (!relative) {
      // Format in client timezone
      const localDate = new Date(date).toLocaleString();
      setFormattedDate(localDate);
    }
  }, [date]);

  return <p className={className}>{formattedDate}</p>;
}
