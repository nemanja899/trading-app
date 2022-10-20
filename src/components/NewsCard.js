import React from "react";
import { Center,Container,AspectRatio,Image,Link,Text } from "@chakra-ui/react";

const NewsCard=({news})=> {

    return(
        <Center>
            <Container  style={{ backgroundColor: "rgba(145,158,171,0.04)" ,maxHeight:"300px"}}
      className="mt-1 p-4 shadow-sm bg-white">
                <Container style={{float:"left"}}>
                    <AspectRatio maxW='300px' ratio={2/1}>
                        <Image src={news.thumbnail}/>
                    </AspectRatio>
                </Container>
                <Container style={{float:"right"}}>
                    <Text  fontSize='lg'>
                        {news.title}
                    </Text>
                    <Text className="font-weight-light" fontSize='xs'>
                        {news.publisher}
                    </Text>
                </Container>
                <Container style={{alignItems:"center"}}>
                    <Link className="btn btn-info" isExternal={true} href={news.link}>
                        Read Article
                    </Link>
                </Container>
            </Container>
        </Center>
    )
};


export default NewsCard;