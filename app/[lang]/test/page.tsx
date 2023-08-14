export default function Page() {
  const page = [
    "hello",
    "world",
    'met(<span class="text-red-900 border border-red-600">"scdvd"</span>)fgh',
  ];

  const renderText = ({ text }: { text: string }) => {
    const splittedText = text.split('"');
    console.log(splittedText);
    if (splittedText.length === 1) return <p>{text}</p>;
    else {
      console.log(splittedText);
      return (
        <p>
          {splittedText[0]}
          <span style={{ color: "red" }}>"{splittedText[1]}"</span>
          {splittedText[2]}
        </p>
      );
    }
  };
  return (
    <>
      {page.map((data, index) => {
        return <div dangerouslySetInnerHTML={{ __html: data }} key={index} />;
      })}
    </>
  );
}
