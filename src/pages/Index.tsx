
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Download, 
  Upload, 
  Trash2, 
  Sun, 
  Moon, 
  Copy, 
  Save,
  FileText,
  Code,
  Eye,
  Settings,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        p {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        .btn {
            background: rgba(255,255,255,0.2);
            border: 2px solid white;
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 10px;
        }
        .btn:hover {
            background: white;
            color: #667eea;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to CodeCraft</h1>
        <p>A modern, professional code editor built with HTML, CSS, and JavaScript</p>
        <button class="btn" onclick="showAlert()">Click Me!</button>
    </div>

    <script>
        function showAlert() {
            alert('Hello from CodeCraft! Edit this code to see changes in real-time.');
        }
    </script>
</body>
</html>`);

  const [cssCode, setCssCode] = useState(`/* Modern CSS Styles */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    min-height: 100vh;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.btn {
    background: rgba(255,255,255,0.2);
    border: 2px solid white;
    color: white;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 10px;
    backdrop-filter: blur(10px);
}

.btn:hover {
    background: white;
    color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}`);

  const [jsCode, setJsCode] = useState(`// Modern JavaScript Code
console.log('CodeCraft Editor Loaded!');

function showAlert() {
    const messages = [
        'Hello from CodeCraft!',
        'Welcome to modern web development!',
        'Keep coding and creating amazing things!',
        'Your code is looking great!'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    alert(randomMessage);
}

// Add some interactivity
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Add a click counter
    let clickCount = 0;
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            clickCount++;
            console.log(\`Button clicked \${clickCount} times\`);
            
            if (clickCount === 5) {
                this.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
                this.textContent = 'You found the Easter egg!';
            }
        });
    });
});

// Utility functions
const utils = {
    getCurrentTime: () => new Date().toLocaleTimeString(),
    randomColor: () => \`#\${Math.floor(Math.random()*16777215).toString(16)}\`,
    delay: (ms) => new Promise(resolve => setTimeout(resolve, ms))
};`);

  const [activeTab, setActiveTab] = useState('html');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [language, setLanguage] = useState('html');
  const [fontSize, setFontSize] = useState('14');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const updatePreview = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const document = iframe.contentDocument || iframe.contentWindow?.document;
      if (document) {
        let fullCode = htmlCode;
        
        // Inject CSS
        if (cssCode.trim()) {
          const styleTag = `<style>${cssCode}</style>`;
          if (fullCode.includes('</head>')) {
            fullCode = fullCode.replace('</head>', `${styleTag}</head>`);
          } else {
            fullCode = `<style>${cssCode}</style>${fullCode}`;
          }
        }
        
        // Inject JavaScript
        if (jsCode.trim()) {
          const scriptTag = `<script>${jsCode}</script>`;
          if (fullCode.includes('</body>')) {
            fullCode = fullCode.replace('</body>', `${scriptTag}</body>`);
          } else {
            fullCode = `${fullCode}<script>${jsCode}</script>`;
          }
        }
        
        document.open();
        document.write(fullCode);
        document.close();
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(updatePreview, 500);
    return () => clearTimeout(timer);
  }, [htmlCode, cssCode, jsCode]);

  const downloadCode = () => {
    let fullCode = htmlCode;
    
    if (cssCode.trim()) {
      const styleTag = `<style>\n${cssCode}\n</style>`;
      if (fullCode.includes('</head>')) {
        fullCode = fullCode.replace('</head>', `${styleTag}\n</head>`);
      } else {
        fullCode = `<style>\n${cssCode}\n</style>\n${fullCode}`;
      }
    }
    
    if (jsCode.trim()) {
      const scriptTag = `<script>\n${jsCode}\n</script>`;
      if (fullCode.includes('</body>')) {
        fullCode = fullCode.replace('</body>', `${scriptTag}\n</body>`);
      } else {
        fullCode = `${fullCode}\n<script>\n${jsCode}\n</script>`;
      }
    }

    const blob = new Blob([fullCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.html';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('File downloaded successfully!');
  };

  const clearCode = () => {
    if (activeTab === 'html') setHtmlCode('');
    else if (activeTab === 'css') setCssCode('');
    else if (activeTab === 'js') setJsCode('');
    toast.success('Code cleared!');
  };

  const copyCode = () => {
    let code = '';
    if (activeTab === 'html') code = htmlCode;
    else if (activeTab === 'css') code = cssCode;
    else if (activeTab === 'js') code = jsCode;
    
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (file.name.endsWith('.html')) {
          setHtmlCode(content);
          setActiveTab('html');
        } else if (file.name.endsWith('.css')) {
          setCssCode(content);
          setActiveTab('css');
        } else if (file.name.endsWith('.js')) {
          setJsCode(content);
          setActiveTab('js');
        }
        toast.success('File uploaded successfully!');
      };
      reader.readAsText(file);
    }
  };

  const runCode = () => {
    updatePreview();
    toast.success('Code executed!');
  };

  const getCurrentCode = () => {
    if (activeTab === 'html') return htmlCode;
    if (activeTab === 'css') return cssCode;
    return jsCode;
  };

  const setCurrentCode = (code: string) => {
    if (activeTab === 'html') setHtmlCode(code);
    else if (activeTab === 'css') setCssCode(code);
    else setJsCode(code);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <div className={`border-b transition-colors ${
        isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Code className="h-6 w-6 text-blue-500" />
                <h1 className="text-xl font-bold">CodeCraft</h1>
              </div>
              <Badge variant="outline" className="text-xs">
                v1.0
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12px</SelectItem>
                  <SelectItem value="14">14px</SelectItem>
                  <SelectItem value="16">16px</SelectItem>
                  <SelectItem value="18">18px</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className={`border-b transition-colors ${
        isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button onClick={runCode} size="sm" className="bg-green-600 hover:bg-green-700">
                <Play className="h-4 w-4 mr-1" />
                Run
              </Button>
              
              <Button onClick={downloadCode} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              
              <Button onClick={copyCode} variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
              
              <input
                type="file"
                accept=".html,.css,.js"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" size="sm" asChild>
                  <span className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-1" />
                    Upload
                  </span>
                </Button>
              </label>
              
              <Button onClick={clearCode} variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-1" />
                Clear
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FileText className="h-4 w-4" />
              <span>Lines: {getCurrentCode().split('\n').length}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Characters: {getCurrentCode().length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex ${isFullscreen ? 'h-screen' : 'h-[calc(100vh-120px)]'}`}>
        {/* Code Editor */}
        <div className="w-1/2 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className={`border-b transition-colors ${
              isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="html" className="flex items-center space-x-1">
                  <span>HTML</span>
                </TabsTrigger>
                <TabsTrigger value="css" className="flex items-center space-x-1">
                  <span>CSS</span>
                </TabsTrigger>
                <TabsTrigger value="js" className="flex items-center space-x-1">
                  <span>JavaScript</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1">
              <TabsContent value="html" className="h-full m-0">
                <textarea
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  className={`w-full h-full resize-none border-0 outline-none p-4 font-mono transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-900 text-gray-100' 
                      : 'bg-white text-gray-900'
                  }`}
                  style={{ fontSize: `${fontSize}px` }}
                  placeholder="Enter your HTML code here..."
                  spellCheck={false}
                />
              </TabsContent>
              
              <TabsContent value="css" className="h-full m-0">
                <textarea
                  value={cssCode}
                  onChange={(e) => setCssCode(e.target.value)}
                  className={`w-full h-full resize-none border-0 outline-none p-4 font-mono transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-900 text-gray-100' 
                      : 'bg-white text-gray-900'
                  }`}
                  style={{ fontSize: `${fontSize}px` }}
                  placeholder="Enter your CSS code here..."
                  spellCheck={false}
                />
              </TabsContent>
              
              <TabsContent value="js" className="h-full m-0">
                <textarea
                  value={jsCode}
                  onChange={(e) => setJsCode(e.target.value)}
                  className={`w-full h-full resize-none border-0 outline-none p-4 font-mono transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-900 text-gray-100' 
                      : 'bg-white text-gray-900'
                  }`}
                  style={{ fontSize: `${fontSize}px` }}
                  placeholder="Enter your JavaScript code here..."
                  spellCheck={false}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Preview */}
        <div className={`w-1/2 border-l transition-colors ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className={`border-b transition-colors px-4 py-2 flex items-center justify-between ${
            isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}>
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span className="font-medium">Live Preview</span>
            </div>
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          
          <iframe
            ref={iframeRef}
            className="w-full h-full border-0"
            title="Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
