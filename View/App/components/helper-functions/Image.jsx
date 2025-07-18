import React from "react";

export function Image({ src, alt, className, style, width, height, fill, ...props }) {
    // Check if fill property is set. if it is set to true, the position is set to absolute and the width and height are set to 100%
    if (fill) {
      return (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
          className={className}
        >
        <img
          src={src}
          alt={alt}
          style={{
            postion:  "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            ...style,
          }}
          {...props}
        />
        </div>
      );
    }
  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className || ""}`}
      style={{
        display: "block",
        maxWidth: "100%",
        height: height || "auto",
        width: width || "auto",
        ...style,
      }}
      loading="lazy" // Enables lazy loading
      {...props}
    />
  );
}