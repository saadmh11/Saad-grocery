const http = require("http");
const fs = require("fs");
const path = require("path");
const { LocalStorage } = require("node-localstorage");

// إنشاء localStorage محلي
const localStorage = new LocalStorage('./scratch');

const server = http.createServer((req, res) => {
    let filePath = req.url === "/" ? "index.html" : req.url;
    filePath = path.join(__dirname, filePath);

    // تحديد نوع المحتوى بناءً على امتداد الملف
    const extname = path.extname(filePath);
    let contentType = "text/html";

    switch (extname) {
        case ".css":
            contentType = "text/css";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
        case ".jpeg":
            contentType = "image/jpeg";
            break;
    }

    if (req.url.startsWith("/show-store")) {
        localStorage.setItem("storeVisible", "true");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "تم إظهار المتجر بنجاح" }));
    } else if (req.url.startsWith("/hide-store")) {
        localStorage.setItem("storeVisible", "false");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "تم إخفاء المتجر بنجاح" }));
    } else if (req.url.startsWith("/get-store-status")) {
        const storeStatus = localStorage.getItem("storeStatus") || "none";
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ storeStatus }));
    } else if (req.url.startsWith("/toggle-store-status")) {
        const storeStatus = localStorage.getItem("storeStatus") === "block" ? "none" : "block";
        localStorage.setItem("storeStatus", storeStatus);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ storeStatus }));
    } else {
        // قراءة الملف وإرساله كاستجابة
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("<h1>404 Not Found</h1>");
            } else {
                res.writeHead(200, { "Content-Type": contentType });
                res.end(content, "utf-8");
            }
        });
    }
});

server.listen(3901, () => {
    console.log("Server is running on http://localhost:3901");
});